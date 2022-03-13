$('#foregroundEmojiError').hide();
$('#backgroundEmojiError').hide();
$('#messageError').hide();
$('#result').hide();

$('#message').on('input', () => {
  $('#messageError').hide();
});

$('#foregroundEmoji').on('input', () => {
  $('#foregroundEmojiError').hide();
});

$('#backgroundEmoji').on('input', () => {
  $('#backgroundEmojiError').hide();
});

$('form').on('submit', (e) => {
  $('#foregroundEmojiError').hide();
  $('#backgroundEmojiError').hide();
  let message = $('#message').val();
  let backgroundEmoji = $('#backgroundEmoji').val();
  let foregroundEmoji = $('#foregroundEmoji').val();
  let isValid = true;

  if (
    !/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g.test(
      foregroundEmoji
    )
  ) {
    $('#foregroundEmojiError').show();
    isValid = false;
  }

  if (
    !/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g.test(
      backgroundEmoji
    )
  ) {
    $('#backgroundEmojiError').show();
    isValid = false;
  }

  if (!message.trim().length) {
    $('#messageError').show();
    isValid = false;
  }

  if (!isValid) return;

  const result = textToEmoji(message, foregroundEmoji, backgroundEmoji);
});

/**
 * Generates 4x5 width emoji from text
 *
 * @param {String} message - Message to be generated
 * @param {String} foreground - Emoji that will be used as letter
 * @param {String} background - Emoji that will be used as background
 * @returns {String} emoji generated
 */
const textToEmoji = (message, foreground, background) => {
  message = message.toLowerCase();
  let result = '';

  for (let i = 0; i < message.length; i++) {
    if (!i) result += 'xxxxxx\n'.replaceAll('x', background);

    let current = letters[message[i] === ' ' ? 'space' : message[i]];
    if (!current) continue;

    current = current?.replaceAll('.', background);
    current = current?.replaceAll('x', foreground);

    let currentParts = current?.split('\n');
    for (let j = 0; j < currentParts?.length; j++) {
      currentParts[j] = background + currentParts[j] + background;
    }
    current = currentParts?.join('\n');

    current += '\n';
    result += current;
    if (current) result += 'xxxxxx\n'.replaceAll('x', background);
  }

  $('#result').val(result);
  $('#result').show();
};
