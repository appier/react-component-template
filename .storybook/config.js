import { configure, setAddon } from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';

function loadStories() {

  require('../src/Calendar/story.js');
  require('../src/DatePicker/story.js');
  require('../src/MultiSelector/story.js');
  require('../src/D3/story.js');
  require('../src/ThreeRender/story.js');
}

setAddon(infoAddon);
configure(loadStories, module);
