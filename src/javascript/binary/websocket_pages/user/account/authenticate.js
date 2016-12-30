var Content         = require('../../../common_functions/content').Content;
var japanese_client = require('../../../common_functions/country_base').japanese_client;
var localize = require('../../../base/localize').localize;
var Client   = require('../../../base/client').Client;
var url_for  = require('../../../base/url').url_for;

var AuthenticateWS = (function() {
    function init() {
        if (japanese_client()) {
            window.location.href = url_for('trading');
        }
        Content.populate();

        function show_error(error) {
            $('#error_message').removeClass('invisible').text(error);
            return true;
        }

        function check_virtual() {
            return Client.get_boolean('is_virtual') && show_error(localize('This feature is not relevant to virtual-money accounts.'));
        }
        if (!check_virtual()) {
            BinarySocket.init({
                onmessage: function(msg) {
                    var response = JSON.parse(msg.data);
                    if (response) {
                        var error = response.error;
                        if (response.msg_type === 'get_account_status' && !check_virtual() && !error) {
                            if ($.inArray('authenticated', response.get_account_status.status) > -1) {
                                $('#fully-authenticated').removeClass('invisible');
                            } else {
                                $('#not-authenticated').removeClass('invisible');
                            }
                        } else if (error) {
                            show_error(error.message);
                        }
                    }
                },
            });
            BinarySocket.send({ get_account_status: 1 });
        }
    }
    return {
        init: init,
    };
})();

module.exports = {
    AuthenticateWS: AuthenticateWS,
};
