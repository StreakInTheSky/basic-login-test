var state = {
  signupEmail: '',
  signupPassword: '',
  loginEmail: '',
  loginPassword: ''
}

function detectFieldChange() {
	$('form :input').change(function(){
		let input = $(this).attr('name')
		state[input] = $(this).val()
	})
}

function signup() {
  var data = {
    email: state.signupEmail,
    password: state.signupPassword
  }
  var settings = {
      url: 'api',
      data: JSON.stringify(data),
      contentType: 'application/json; charset=utf-8'
  }

  $.post(settings)
    .done(function(data) {
      $('.dump').text('Created user with ' + data)
    })
    .fail(function(xhr, status, errorThrown) {
      console.log('failure')
      $('.dump').text(xhr.responseText)
    })
}

function login() {
  var settings = {
    url: 'api',
    headers: {
      "Authorization": "Basic " + btoa(state.loginEmail + ":" + state.loginPassword)
    }
  }

  $.get(settings)
    .done(function(data){
      $('.dump').text('Signed in as ' + data.email)
    })
    .fail(function(xhr, status, errorThrown) {
      $('.dump').text(xhr.responseText)
    })
}

function buttonListeners() {
  $('#signup-button').click(function(event){
    event.preventDefault()
    signup()
  })
  $('#login-button').click(function(event){
    event.preventDefault()
    login()
  })

}

$(function() {
  buttonListeners()
  detectFieldChange()
})
