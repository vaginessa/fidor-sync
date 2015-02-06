
var GatewayClient = require(__dirname+'/../src/gateway_client')
var config = require(__dirname+'/../src/config')
var assert = require('assert')
var uuid = require('uuid') 

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

describe('Gateway Client', function() {
  var gatewayClient;

  beforeEach(function() {
    gatewayClient = new GatewayClient({
      url: config.get('EUR_GATEWAY_URL'),
      username: config.get('EUR_GATEWAY_USERNAME'),
      password: config.get('EUR_GATEWAY_PASSWORD')
    })
  });

  it('should be able to get external payments', function(done) {
    gatewayClient.getTransactions()
      .then(function(payments) {
        assert.strictEqual(typeof payments, 'object');
        done();
      })
  });

  it.skip('should be able to create a transaction', function(done) {
    var uuidNum = uuid.v4();
    var transaction = {
      deposit: false,
      external_account_id: 12,
      source_amount: 2,
      source_currency: 'EUR',
      destination_amount: 2,
      destination_currency: 'EUR',
      status: 'queued',
      ripple_transaction_id: 234,
      uid: uuidNum,
      invoice_id: '84cfb783192e9e563bf8e3b0ac31d9403a185e5af5f5a441db855dcc4a8a171a'
    };

    gatewayClient.createExternalTransaction(transaction)
      .then(function(response) {
        assert.strictEqual(response.success, true);
        assert.strictEqual(response.externalTransaction.uid, uuidNum);
        done();
      })
  });

  it('should be able to update transaction status to cleared', function(done) {
    var transaction = {
      deposit: false,
      external_account_id: 12,
      source_amount: 2,
      source_currency: 'EUR',
      destination_amount: 2,
      destination_currency: 'EUR',
      status: 'queued',
      ripple_transaction_id: 234,
      destination_account_id: 3,
      uid: uuid.v4(),
      user_id: 1,
      invoice_id: '84cfb783192e9e563bf8e3b0ac31d9403a185e5af5f5a441db855dcc4a8a171a'
    };

    gatewayClient.createExternalTransaction(transaction)
      .then(function(transactions) {
        // gatewayClient.updateTransactionStatus(transactions.externalTransaction.id, 'cleared')
        //   .then(function(response) {
        //     assert.strictEqual(response.externalTransaction.status, 'cleared');
        //     done();
        //   })
        done();
      })
  });

  it.skip('should be able to create an external account', function(done) {
    var uuidNum = uuid.v4();
    var externalAcct = {
      address: 'DE72965563127474898541',
      name: 'Yong-Soo',
      user_id: 1,
      uid: '111',
      type: 'iban',
      data: 'Bank of Yong-Soo'
    };

    gatewayClient.createExternalAccount(externalAcct)
      .then(function(response) {
        assert.strictEqual(response.success, true);
        done();
      })
  });


});