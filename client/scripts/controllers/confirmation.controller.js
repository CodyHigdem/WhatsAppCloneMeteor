angular
	.module('Whatsapp')
	.controller('ConfirmationCtrl', ConfirmationCtrl);

	//

	function confirm() {
		if (_.isEmpty(this.code)) return;

		Accounts.verifyPhone(this.phone, this.code, function(err) {
			if (err) return handleError(err);
			$state.go('profile');
		});
	}

	function handleError(err){
		$log.error('Verification error ', err);

		$ionicPopup.alert({
			title: err.reason || 'Verification failed', 
			template: 'Please try again',
			okType: 'button-positive button-clear'
		});
	}
