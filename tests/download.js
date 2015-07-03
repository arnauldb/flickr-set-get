'use strict';

var nock = require('nock');
var chai = require('chai');
var fs = require('fs');
var download = require('../lib/download');

chai.should();

describe('download', function ƒ() {

  describe('#download()', function ƒ() {

    it('should download a file creating a temp file', function ƒ(done) {
      var fileContent = 'This is the file content';
      var dest = './tests/temp.txt';
      var tempDest = './tests/temp.txt.download';

      nock('http://somedomain.com')
        .get('/somefile.txt')
        .reply(200, fileContent)
      ;

      var stream = download('http://somedomain.com/somefile.txt', dest, function onDownloadFinished(err, data) {
        // tests whether the file has been correctly renamed and has the correct content
        chai.assert(fs.existsSync(dest));
        var content = fs.readFileSync(dest, {encoding:'utf8'});
        content.should.be.equal(fileContent);
        fs.unlink(dest, done);
      });

      // Tests if the temp file has been created
      var testHandler = function ƒ() {
        chai.assert(fs.existsSync(tempDest));
        stream.removeListener('data', testHandler);
      };

      stream.on('data', testHandler);
    });

  });

});
