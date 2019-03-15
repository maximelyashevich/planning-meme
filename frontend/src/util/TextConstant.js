const DEFAULT_COOKIE_REGEX = `/([.$?*|()\[\]\\\/+^])/g`;

const DEFAULT_COOKIE_VALUE = '=; path=/; domain=.hanatrial.ondemand.com; expires=Session';

const BOARD_URL_REGEX = /boards\/([\d]+)\/stories/g;

const USER_COOKIE_NAME = 'user';

const MEME_START_ENDPOINT = '/meme/start';
const MEME_VOTE_ENDPOINT = '/meme/vote';
const MEME_FINISH_ENDPOINT = '/meme/finish';

export {DEFAULT_COOKIE_REGEX, BOARD_URL_REGEX, USER_COOKIE_NAME, DEFAULT_COOKIE_VALUE,
    MEME_START_ENDPOINT, MEME_VOTE_ENDPOINT, MEME_FINISH_ENDPOINT};