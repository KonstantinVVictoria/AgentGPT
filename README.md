# AgentGPT: GPT4 Agent Factory

AgentGPT is a package that simplifies the creation of GPT4 agents, also known as Language Models (LLMs) or AIs, designed to accomplish specific tasks. It enables the development of multiple GPT agents and multi-agent architectures to perform more complex tasks by leveraging specialized AIs. Imagine a neural network where each node is an LLM.

## Features

- Easily create GPT4 agents for specific tasks
- Build multi-agent architectures for complex tasks
- Leverage specialized AIs for improved performance
- Simplify the process of interacting with OpenAI's GPT-4 API

## Installation

```bash
npm install agentgpt
```

## Usage

1. Import the AgentFactory:

```javascript
const AgentFactory = require("@adasuite/agentgpt");
```

2. Create an instance of the AgentFactory using your OpenAI API key:

```javascript
const Recruit = AgentFactory({
  API_KEY: "your_openai_api_key_here",
});
```

3. Define your GPT4 agents by providing their identities, analysis tasks, and expected output formats:

```javascript
const MyAgent = Recruit.new_agent({
  identity: "You are a specific agent",
  analysis: "Based on the input, perform a specific task",
  output: "<desired_output_format>",
});
```

4. Use the `analyze()` function to interact with your agent(s) and process input data:

```javascript
async function processData(input) {
  const result = await MyAgent.analyze([input]);
  console.log(result);
}

processData("your_input_data_here");
```

## Documentation

### AgentFactory

The main object that helps you create GPT-4 agents.

#### Parameters

- `API_KEY` (string): Your OpenAI API key.

#### Methods

- `new_agent(options)`: Creates a new GPT-4 agent with the specified options.

### new_agent(options)

Create a new GPT-4 agent by providing the required options.

#### Options

- `identity` (string, optional): A description of the agent's identity.
- `analysis` (string): A description of the task the agent will perform.
- `output` (string): The expected output format.

#### Returns

- A new GPT-4 agent with the specified identity, analysis task, and output format.

### Agent

An object representing a GPT-4 agent.

#### Methods

- `analyze(inputs, config)`: Processes the input data and returns the results.

### analyze(inputs, config)

Process the input data using the agent's defined task and return the results.

#### Parameters

- `inputs` (array): An array of input data.
- `config` (object, optional): Configuration options for the GPT-4 API call.

#### Returns

- The processed results based on the agent's analysis task and output format.

## Example

See the provided example in the `examples` folder for a demonstration of how to create and use multiple GPT-4 agents for a complex task.

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request. We welcome any improvements or suggestions!

## License

AgentGPT is released under the MIT License.
