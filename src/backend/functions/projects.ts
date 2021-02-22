import { Context } from 'aws-lambda';

export async function handler(event: any, context: Context) {
  try {
    return {
      statusCode: 201,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(exampleAllProjects)
    };
  } catch (error) {
    console.error(error);
    return { statusCode: 500 };
  }
}

// Duplicated from /src/types/projct-types.ts due to serverless quirks
interface Project {
  wbsNum: String;
  name: String;
  projectLead: String;
  projectManager: String;
  duration: Number;
}

const exampleProject1: Project = {
  wbsNum: '1.1.0',
  name: 'Impact Attenuator',
  projectLead: 'Person Allen',
  projectManager: 'Person Gilbert',
  duration: 2
};

const exampleProject2: Project = {
  wbsNum: '1.2.0',
  name: 'Bodywork',
  projectLead: 'Person Richard',
  projectManager: 'Person David',
  duration: 4
};

const exampleProject3: Project = {
  wbsNum: '1.12.0',
  name: 'Battery Box',
  projectLead: 'Person Karen',
  projectManager: 'Person Solomon',
  duration: 5
};

const exampleProject4: Project = {
  wbsNum: '2.6.0',
  name: 'Motor Controller Integration',
  projectLead: 'Person Emily',
  projectManager: 'Person Zoe',
  duration: 9
};

const exampleProject5: Project = {
  wbsNum: '2.8.0',
  name: 'Driver IO',
  projectLead: 'Person George',
  projectManager: 'Person William',
  duration: 12
};

export const exampleAllProjects: Project[] = [
  exampleProject1,
  exampleProject2,
  exampleProject3,
  exampleProject4,
  exampleProject5
];
