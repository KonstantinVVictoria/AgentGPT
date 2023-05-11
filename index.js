const fetch = require("node-fetch");

function AgentFactory({ API_KEY }) {
  if (API_KEY === undefined) throw "API KEY is missing";
  let Interface = {};
  Interface.new_agent = function ({ identity, analysis, output }) {
    if (analysis === undefined) throw "Missing Agent analysis.";
    if (output === undefined) throw "Missing Agent output format.";
    const prompt = function (input) {
      if (input === undefined) throw "Missing input.";
      return `${
        `${identity}\n` || ``
      }Analysis:\n${analysis}\nData:\n${input}\nRespond in the following form:\n ${output}`;
    };
    return {
      analyze: async function (inputs, config) {
        let input_array = inputs;
        if (typeof inputs !== "object" || inputs.length === undefined)
          input_array = [inputs];
        const input = input_array.reduce((prev, curr) => {
          let current_string = curr;
          if (typeof curr === "object") {
            current_string = curr?.to_object
              ? JSON.stringify(curr.to_object())
              : JSON.stringify(curr);
          }
          return prev + "\n" + current_string;
        }, "");
        const query = prompt(input);
        console.log(query, "\n");

        const response = await fetch(
          "https://api.openai.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${API_KEY}`,
            },
            body: JSON.stringify(
              Object.assign(
                {
                  model: "gpt-4",
                  messages: [{ role: "user", content: query }],
                },
                config
              )
            ),
          }
        ).then((response) => response.json());
        if (response.error) {
          console.error(response.error);
          throw response.error;
        } else if (response.choices[0].message.content) {
          const content = response.choices[0].message.content;
          try {
            return JSON.parse(content);
          } catch (error) {
            return content;
          }
        }
      },
    };
  };

  return Interface;
}

module.exports = AgentFactory;
