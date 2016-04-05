angular
	.module('Whatsapp')
	.run(run);

	//
function run ($rootScope, $state){
	$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
		//catch error and redirect user to main page

		if (error === 'AUTH_REQUIRED'){
			$state.go('login');
		}
	});
}
