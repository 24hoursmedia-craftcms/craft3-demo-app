require('./../css/tailwind.scss');

const $ = $ ? $ : require('jquery');
global.$ = global.jQuery = global.jquery = $;


require('./init/comments-work');