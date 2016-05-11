var PaperCipher = require('../src/paper_cipher.js');

describe('PaperCipher', function() {
  it('test move_to positive positions', function() {
    expect(PaperCipher.move_to(['A', 'B', 'C'], 0)).toBe('A');
    expect(PaperCipher.move_to(['A', 'B', 'C'], 1)).toBe('B');
    expect(PaperCipher.move_to(['A', 'B', 'C'], 2)).toBe('C');

    expect(PaperCipher.move_to(['A', 'B', 'C'], 24)).toBe('A');
    expect(PaperCipher.move_to(['A', 'B', 'C'],  7)).toBe('B');
    expect(PaperCipher.move_to(['A', 'B', 'C'],  5)).toBe('C');
  });

  it('test move_to negative positions', function() {
    expect(PaperCipher.move_to(['A', 'B', 'C'], -1)).toBe('C');
    expect(PaperCipher.move_to(['A', 'B', 'C'], -2)).toBe('B');
    expect(PaperCipher.move_to(['A', 'B', 'C'], -3)).toBe('A');

    expect(PaperCipher.move_to(['A', 'B', 'C'], -18)).toBe('A');
    expect(PaperCipher.move_to(['A', 'B', 'C'], -26)).toBe('B');
    expect(PaperCipher.move_to(['A', 'B', 'C'], -13)).toBe('C');
  });

  it('test latin encrypt', function() {
    expect(PaperCipher.encrypt('RUA C',    0)).toBe('RUA C');
    expect(PaperCipher.encrypt('RUA C',    1)).toBe('SVB D');
    expect(PaperCipher.encrypt('RUA C',    2)).toBe('TWC E');
    expect(PaperCipher.encrypt('RUA C', 8798)).toBe('58O Q');
  });

  it('test latin decrypt', function() {
    expect(PaperCipher.decrypt('RUA C',    0)).toBe('RUA C');
    expect(PaperCipher.decrypt('SVB D',    1)).toBe('RUA C');
    expect(PaperCipher.decrypt('TWC E',    2)).toBe('RUA C');
    expect(PaperCipher.decrypt('58O Q', 8798)).toBe('RUA C');
  });

  it('test hangul encrypt', function() {
    expect(PaperCipher.encrypt('RUA C', 0,   'hangul')).toBe('ㅚㅝㅏ ㅓ');
    expect(PaperCipher.encrypt('RUA C', 1,   'hangul')).toBe('ᅱㅂㅑ ㅕ');
    expect(PaperCipher.encrypt('RUA C', 2,   'hangul')).toBe('ㅢㄷㅓ ㅐ');
    expect(PaperCipher.encrypt('RUA C', 456, 'hangul')).toBe('ㅒㅜㅅ ㄴ');
  });

  it('test hangul decrypt', function() {
    expect(PaperCipher.decrypt('ㅚㅝㅏ ㅓ', 0,   'hangul')).toBe('RUA C');
    expect(PaperCipher.decrypt('ᅱㅂㅑ ㅕ', 1,   'hangul')).toBe('RUA C');
    expect(PaperCipher.decrypt('ㅢㄷㅓ ㅐ', 2,   'hangul')).toBe('RUA C');
    expect(PaperCipher.decrypt('ㅒㅜㅅ ㄴ', 456, 'hangul')).toBe('RUA C');
  });

  it('test encrypt extra characters', function() {
    expect(PaperCipher.encrypt('Téste',  0, 'latin')).toBe('TéSTE');
    expect(PaperCipher.encrypt("Rua\n9", 0, 'latin')).toBe("RUA\n9");

    expect(PaperCipher.encrypt("Rua\n9", 24, 'latin')).toBe("FIY\nX");

    expect(PaperCipher.encrypt('Téste',  0, 'hangul')).toBe('ㅢéᅱㅢㅐ');
    expect(PaperCipher.encrypt("Rua\n9", 0, 'hangul')).toBe("ㅚㅝㅏ\nㄲ");

    expect(PaperCipher.encrypt("Rua\n9", 24, 'hangul')).toBe("ㅒㅜㅅ\nㄱ");
  });

  it('test decrypt extra characters', function() {
    expect(PaperCipher.decrypt('TéSTE',   0, 'latin')).toBe('TéSTE');
    expect(PaperCipher.decrypt("RUA\n9",  0, 'latin')).toBe("RUA\n9");
    expect(PaperCipher.decrypt("FIY\nX", 24, 'latin')).toBe("RUA\n9");

    expect(PaperCipher.decrypt('ㅢéᅱㅢㅐ',   0, 'hangul')).toBe('TéSTE');
    expect(PaperCipher.decrypt("ㅚㅝㅏ\nㄲ",  0, 'hangul')).toBe("RUA\n9");
    expect(PaperCipher.decrypt("ㅒㅜㅅ\nㄱ", 24, 'hangul')).toBe("RUA\n9");
  });
});
