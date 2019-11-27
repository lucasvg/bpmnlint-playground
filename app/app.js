import lintModule from 'bpmn-js-bpmnlint';

import BpmnModeler from 'bpmn-js/lib/Modeler';

import bpmnlintConfig from '../.bpmnlintrc';

import defaultDiagramXML from '../diagrams/ProcessoJHipsterComErro2.bpmn';

import fileDrop from 'file-drops';

import download from 'downloadjs';


var diagramXML = window.localStorage.getItem('diagramXML');

var modeler = new BpmnModeler({
  container: '#canvas',
  additionalModules: [
    lintModule
  ],
  linting: {
    bpmnlint: bpmnlintConfig,
    active: getUrlParam('linting')
  },
  keyboard: {
    bindTo: document
  }
});


modeler.importXML(diagramXML || defaultDiagramXML);

modeler.on('linting.toggle', function(event) {

  var active = event.active;

  setUrlParam('linting', active);
});

modeler.on('import.parse.start', function(event) {
  var xml = event.xml;

  window.localStorage.setItem('diagramXML', xml);
});

var dndHandler = fileDrop('Drop BPMN Diagram here.', function(files) {
  modeler.importXML(files[0].contents);
});

document.querySelector('#download-button').addEventListener('click', function(event) {

  modeler.saveXML({ format: true }, function(err, xml) {
    if (!err) {
      download(xml, 'diagram.bpmn', 'application/xml');
    }
  });
});

document.querySelector('body').addEventListener('dragover', dndHandler);


// helpers /////////////////////////////////

function setUrlParam(name, value) {

  var url = new URL(window.location.href);

  if (value) {
    url.searchParams.set(name, 1);
  } else {
    url.searchParams.delete(name);
  }

  window.history.replaceState({}, null, url.href);
}

function getUrlParam(name) {
  var url = new URL(window.location.href);

  return url.searchParams.has(name);
}