class PaperCipher
  LATIN = %w(
    A B C D E F G H I J K L M N O P Q R
    S T U V W X Y Z 0 1 2 3 4 5 6 7 8 9
  ).freeze

  HANGUL = %w(
    ㅏ ㅑ ㅓ ㅕ ㅐ ㅒ ㅗ ㅛ ㅜ ㅠ ㅔ ㅖ ㅣ ㅡ ㅘ ㅙ ㅞ ㅚ
    ᅱ ㅢ ㅝ ㅂ ㄷ ㄱ ㅅ ㅁ ㄴ ㅇ ㄹ ㅎ ㅋ ㅌ ㅍ ㅃ ㄸ ㄲ
  ).freeze

  def self.move_to(characters, position)
    characters[position % characters.size]
  end

  def self.encrypt(text, password, format: 'latin')
    user_input_characters = text.split('')

    encrypted_characters_list = (format == 'hangul') ? HANGUL : LATIN

    user_input_characters.map do |character|
      position_on_decrypted = LATIN.index(character.upcase)

      if position_on_decrypted
        move_to(encrypted_characters_list, position_on_decrypted + password)
      else
        character
      end
    end.join
  end

  def self.decrypt(text, password, format: 'latin')
    user_input_characters = text.split('')

    encrypted_characters_list = (format == 'hangul') ? HANGUL : LATIN

    user_input_characters.map do |character|
      position_on_result = encrypted_characters_list.index(character)

      if position_on_result
        move_to(LATIN, position_on_result - password)
      else
        character
      end
    end.join
  end
end
