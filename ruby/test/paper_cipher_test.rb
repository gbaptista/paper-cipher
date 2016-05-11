require 'minitest/autorun'

require './lib/paper_cipher'

class TestPaperCipher < Minitest::Test
  def test_move_to_positive_positions
    assert_equal('A', PaperCipher.move_to(%w(A B C), 0))
    assert_equal('B', PaperCipher.move_to(%w(A B C), 1))
    assert_equal('C', PaperCipher.move_to(%w(A B C), 2))

    assert_equal('A', PaperCipher.move_to(%w(A B C), 24))
    assert_equal('B', PaperCipher.move_to(%w(A B C), 7))
    assert_equal('C', PaperCipher.move_to(%w(A B C), 5))
  end

  def test_move_to_negative_positions
    assert_equal('C', PaperCipher.move_to(%w(A B C), -1))
    assert_equal('B', PaperCipher.move_to(%w(A B C), -2))
    assert_equal('A', PaperCipher.move_to(%w(A B C), -3))

    assert_equal('A', PaperCipher.move_to(%w(A B C), -18))
    assert_equal('B', PaperCipher.move_to(%w(A B C), -26))
    assert_equal('C', PaperCipher.move_to(%w(A B C), -13))
  end

  def test_latin_encrypt
    assert_equal 'RUA C', PaperCipher.encrypt('RUA C', 0)
    assert_equal 'SVB D', PaperCipher.encrypt('RUA C', 1)
    assert_equal 'TWC E', PaperCipher.encrypt('RUA C', 2)
    assert_equal '58O Q', PaperCipher.encrypt('RUA C', 8798)
  end

  def test_latin_decrypt
    assert_equal 'RUA C', PaperCipher.decrypt('RUA C', 0)
    assert_equal 'RUA C', PaperCipher.decrypt('SVB D', 1)
    assert_equal 'RUA C', PaperCipher.decrypt('TWC E', 2)
    assert_equal 'RUA C', PaperCipher.decrypt('58O Q', 8798)
  end

  def test_hangul_encrypt
    assert_equal 'ㅚㅝㅏ ㅓ', PaperCipher.encrypt('RUA C', 0,   format: 'hangul')
    assert_equal 'ᅱㅂㅑ ㅕ', PaperCipher.encrypt('RUA C', 1,   format: 'hangul')
    assert_equal 'ㅢㄷㅓ ㅐ', PaperCipher.encrypt('RUA C', 2,   format: 'hangul')
    assert_equal 'ㅒㅜㅅ ㄴ', PaperCipher.encrypt('RUA C', 456, format: 'hangul')
  end

  def test_hangul_decrypt
    assert_equal 'RUA C', PaperCipher.decrypt('ㅚㅝㅏ ㅓ', 0,   format: 'hangul')
    assert_equal 'RUA C', PaperCipher.decrypt('ᅱㅂㅑ ㅕ', 1,   format: 'hangul')
    assert_equal 'RUA C', PaperCipher.decrypt('ㅢㄷㅓ ㅐ', 2,   format: 'hangul')
    assert_equal 'RUA C', PaperCipher.decrypt('ㅒㅜㅅ ㄴ', 456, format: 'hangul')
  end

  def test_encrypt_extra_characters
    assert_equal 'TéSTE',  PaperCipher.encrypt('Téste',  0, format: 'latin')
    assert_equal "RUA\n9", PaperCipher.encrypt("Rua\n9", 0, format: 'latin')

    assert_equal "FIY\nX", PaperCipher.encrypt("Rua\n9", 24, format: 'latin')

    assert_equal 'ㅢéᅱㅢㅐ',  PaperCipher.encrypt('Téste',  0, format: 'hangul')
    assert_equal "ㅚㅝㅏ\nㄲ", PaperCipher.encrypt("Rua\n9", 0, format: 'hangul')

    assert_equal "ㅒㅜㅅ\nㄱ", PaperCipher.encrypt("Rua\n9", 24, format: 'hangul')
  end

  def test_decrypt_extra_characters
    assert_equal 'TéSTE',  PaperCipher.decrypt('TéSTE',   0, format: 'latin')
    assert_equal "RUA\n9", PaperCipher.decrypt("RUA\n9",  0, format: 'latin')
    assert_equal "RUA\n9", PaperCipher.decrypt("FIY\nX", 24, format: 'latin')

    assert_equal 'TéSTE',  PaperCipher.decrypt('ㅢéᅱㅢㅐ',   0, format: 'hangul')
    assert_equal "RUA\n9", PaperCipher.decrypt("ㅚㅝㅏ\nㄲ",  0, format: 'hangul')
    assert_equal "RUA\n9", PaperCipher.decrypt("ㅒㅜㅅ\nㄱ", 24, format: 'hangul')
  end
end
