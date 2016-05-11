var PaperCipher = {
  LATIN: [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
    'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
    'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
  ],

  HANGUL: [
    'ㅏ', 'ㅑ', 'ㅓ', 'ㅕ', 'ㅐ', 'ㅒ', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅔ', 'ㅖ',
    'ㅣ', 'ㅡ', 'ㅘ', 'ㅙ', 'ㅞ', 'ㅚ', 'ᅱ', 'ㅢ', 'ㅝ', 'ㅂ', 'ㄷ', 'ㄱ',
    'ㅅ', 'ㅁ', 'ㄴ', 'ㅇ', 'ㄹ', 'ㅎ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅃ', 'ㄸ', 'ㄲ'
  ],

  move_to: function(characters, position) {
    var index = position % characters.length;

    if(index < 0) index = characters.length - (index * - 1);

    return characters[index];
  },

  encrypt: function(text, password, format) {
    var self = PaperCipher;

    var user_input_characters = text.split('');

    var encrypted_characters_list = (format == 'hangul') ? self.HANGUL : self.LATIN;

    var encrypted_output = '';

    user_input_characters.forEach(function(character) {
      var position_on_decrypted = self.LATIN.indexOf(character.toUpperCase());

      if(position_on_decrypted >= 0) {
        encrypted_output += self.move_to(encrypted_characters_list, position_on_decrypted + password);
      } else {
        encrypted_output += character;
      }
    });

    return encrypted_output;
  },

  decrypt: function(text, password, format) {
    var self = PaperCipher;

    var user_input_characters = text.split('');

    var encrypted_characters_list = (format == 'hangul') ? self.HANGUL : self.LATIN;

    var decrypted_output = '';

    user_input_characters.forEach(function(character) {
      var position_on_result = encrypted_characters_list.indexOf(character.toUpperCase());

      if(position_on_result >= 0) {
        decrypted_output += self.move_to(self.LATIN, position_on_result - password);
      } else {
        decrypted_output += character;
      }
    });

    return decrypted_output;
  }
}

if(typeof module !== 'undefined' && module.hasOwnProperty('exports')) {
  module.exports = PaperCipher;
}
