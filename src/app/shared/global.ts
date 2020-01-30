'use strict';

export const GlobalVariablePath = Object.freeze({
  BASE_GIT_URL: 'DeMaxOnline/1819GDI',
  BASE_PATH_YAML: "src/assets/yaml",

});

export const GlobalLocalImages = Object.freeze({
  IMAGE_NAME_MAXIMIZE: "maximize.png",
  IMAGE_NAME_MAXIMIZED: "maximized.png",
  IMAGE_NAME_CLOSE: "close.png",
  IMAGE_NAME_MINIMIZE: "minimize.png",
  SOUND_SENSOR: 'sound-sensor.png',
  ENVIRONMENT_SENSOR: 'environment-sensor.png',
  MOTHERBOARD: 'motherboard.svg',
  BUTTON_SENSOR: 'button-sensor.png'
});

export const GlobalVariableNames = Object.freeze({
  IMAGE_NAME_MAXIMIZE: "maximize.png",
  IMAGE_NAME_MAXIMIZED: "maximized.png",
  IMAGE_NAME_CLOSE: "close.png",
  IMAGE_NAME_MINIMIZE: "minimize.png",
  FILE_NAME_AT_COMMANDS: "commands",
  FILE_NAME_AT_RESPONDS: "response",
  FILE_NAME_KNOWN_SENSORS: "sensors",
  FILE_NAME_ICON_SENSORS: "sensor-icons"
});

export const GlobalVariableCMD = Object.freeze({
  PING_INITIALIZE: "AT_PING_INITIALIZE",
  LIST_DEVICES: "AT_GET_LIST_DEVICES",
  GET_THRESHOLD_VALUES: 'AT_GET_THRESHOLD_INFO',
  SET_THRESHOLD_ENABLED: 'AT_SET_THRESHOLD_ENABLE',
  SET_THRESHOLD_LOW: 'AT_SET_THRESHOLD_LOW',
  SET_THRESHOLD_HIGH: 'AT_SET_THRESHOLD_HIGH',
  GET_POLLING_INTERVAL: 'AT_GET_INTERVAL',
  SET_POLLING_INTERVAL: 'AT_SET_INTERVAL',
  CLOSE: 'AT_CLOSE'
});

export const GlobalVariableResponse = Object.freeze({
  PING_INITIALIZE: "AT_PING_INITIALIZE",
  LIST_DEVICES: "AT_GET_LIST_DEVICES",
  GET_THRESHOLD_VALUES: 'AT_GET_THRESHOLD',
  GET_POLLING_INTERVAL: 'AT_GET_POLL',
  AT_SET_THRESHOLD: 'AT_SET_THRESHOLD',
  AT_SET_POLLING: 'AT_SET_POLL',
  CLOSE: 'AT_CLOSE',
});


