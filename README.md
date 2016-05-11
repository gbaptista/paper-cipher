# Paper Cipher

* [Ruby](#ruby)
* [JavaScript](#javascript)

A simple experimental mix between the Caesar Cipher and the Substitution Cipher method.

## Ruby

Run tests:
```
bundle
rake test
```

### Usage

#### Encrypt and Decrypt
```ruby
# encrypt(text, password, format: 'latin')
PaperCipher.encrypt('RUA C', 2) # => 'TWC E'
PaperCipher.encrypt('RUA C', 456, format: 'hangul') # => 'ㅒㅜㅅ ㄴ'

# decrypt(text, password, format: 'latin')
PaperCipher.decrypt('TWC E', 2) # => 'RUA C'
PaperCipher.decrypt('ㅒㅜㅅ ㄴ', 456, format: 'hangul') # => 'RUA C'
```

## JavaScript

Run tests:
```
npm install -g jasmine
jasmine
```

### Usage

#### Encrypt and Decrypt
```javascript
// encrypt(text, password, format)
PaperCipher.encrypt('RUA C', 2); // 'TWC E'
PaperCipher.encrypt('RUA C', 456, 'hangul'); // 'ㅒㅜㅅ ㄴ'

// decrypt(text, password, format)
PaperCipher.decrypt('TWC E', 2); // 'RUA C'
PaperCipher.decrypt('ㅒㅜㅅ ㄴ', 456, 'hangul'); // 'RUA C'
```
