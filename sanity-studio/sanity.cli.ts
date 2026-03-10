import { defineCliConfig } from 'sanity/cli';
import { getStudioSanityDataset, getStudioSanityProjectId } from '../src/lib/sanity/env';

export default defineCliConfig({
  api: {
    projectId: getStudioSanityProjectId(),
    dataset: getStudioSanityDataset(),
  },
  studioHost: 'cine-classic-studios',
  deployment: {
    appId: 'j02whgurestn47mururi317n',
  },
});
