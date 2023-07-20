/**
 * Script for offlineLogin.ejs
 */

// Login Elements
const offlineLoginCancelContainer  = document.getElementById('offlineLoginCancelContainer')
const offlineLoginCancelButton     = document.getElementById('offlineLoginCancelButton')
const offlineLoginEmailError       = document.getElementById('offlineLoginEmailError')
const offlineLoginUsername         = document.getElementById('offlineLoginUsername')
const offlineCheckmarkContainer    = document.getElementById('offlineCheckmarkContainer')
const offlineLoginRememberOption   = document.getElementById('offlineLoginRememberOption')
const offlineLoginButton           = document.getElementById('offlineLoginButton')
const offlineLoginForm             = document.getElementById('offlineLoginForm')

// Control variables.
let olu = false


/**
 * Show a offlineLogin error.
 * 
 * @param {HTMLElement} element The element on which to display the error.
 * @param {string} value The error text.
 */
function showError(element, value){
    element.innerHTML = value
    element.style.opacity = 1
}

/**
 * Shake a offlineLogin error to add emphasis.
 * 
 * @param {HTMLElement} element The element to shake.
 */
function shakeError(element){
    if(element.style.opacity == 1){
        element.classList.remove('shake')
        void element.offsetWidth
        element.classList.add('shake')
    }
}

/**
 * Validate that an email field is neither empty nor invalid.
 * 
 * @param {string} value The email value.
 */
function validateOfflineUsername(value){
    if(value){
        if(!validUsername.test(value)){
            showError(offlineLoginEmailError, Lang.queryJS('login.error.invalidValue'))
            offlineLoginDisabled(true)
            olu = false
        } else {
            offlineLoginEmailError.style.opacity = 0
            olu = true
            offlineLoginDisabled(false)
        }
    } else {
        olu = false
        showError(offlineLoginEmailError, Lang.queryJS('login.error.requiredValue'))
        offlineLoginDisabled(true)
    }
}

// Emphasize errors with shake when focus is lost.
offlineLoginUsername.addEventListener('focusout', (e) => {
    validateOfflineUsername(e.target.value)
    shakeError(offlineLoginEmailError)
})

// Validate input for each field.
offlineLoginUsername.addEventListener('input', (e) => {
    validateOfflineUsername(e.target.value)
})

/**
 * Enable or disable the offlineLogin button.
 * 
 * @param {boolean} v True to enable, false to disable.
 */
function offlineLoginDisabled(v){
    if(offlineLoginButton.disabled !== v){
        offlineLoginButton.disabled = v
    }
}

/**
 * Enable or disable loading elements.
 * 
 * @param {boolean} v True to enable, false to disable.
 */
function offlineLoginLoading(v){
    if(v){
        offlineLoginButton.setAttribute('loading', v)
        offlineLoginButton.innerHTML = offlineLoginButton.innerHTML.replace(Lang.queryJS('login.login'), Lang.queryJS('login.loggingIn'))
    } else {
        offlineLoginButton.removeAttribute('loading')
        offlineLoginButton.innerHTML = offlineLoginButton.innerHTML.replace(Lang.queryJS('login.loggingIn'), Lang.queryJS('login.login'))
    }
}

/**
 * Enable or disable offlineLogin form.
 * 
 * @param {boolean} v True to enable, false to disable.
 */
function offlineFormDisabled(v){
    offlineLoginDisabled(v)
    offlineLoginCancelButton.disabled = v
    offlineLoginUsername.disabled = v
    if(v){
        offlineCheckmarkContainer.setAttribute('disabled', v)
    } else {
        offlineCheckmarkContainer.removeAttribute('disabled')
    }
    offlineLoginRememberOption.disabled = v
}

let offlineLoginViewOnSuccess = VIEWS.landing
let offlineLoginViewOnCancel = VIEWS.settings
let offlineLoginViewCancelHandler

function offlineLoginCancelEnabled(val){
    if(val){
        $(offlineLoginCancelContainer).show()
    } else {
        $(offlineLoginCancelContainer).hide()
    }
}

offlineLoginCancelButton.onclick = (e) => {
    switchView(getCurrentView(), offlineLoginViewOnCancel, 500, 500, () => {
        offlineLoginUsername.value = ''
        offlineLoginCancelEnabled(false)
        if(offlineLoginViewCancelHandler != null){
            offlineLoginViewCancelHandler()
            offlineLoginViewCancelHandler = null
        }
    })
}

// Disable default form behavior.
offlineLoginForm.onsubmit = () => { return false }

// Bind offlineLogin button behavior.
offlineLoginButton.addEventListener('click', () => {
    // Disable form.
    offlineFormDisabled(true)

    // Show loading stuff.
    offlineLoginLoading(true)

    const username = offlineLoginUsername.value
    const value = AuthManager.addOfflineAccount(username)
    $('.circle-loader').toggleClass('load-complete')
    $('.offlineCheckmark').toggle()

    updateSelectedAccount(value)
    
    setTimeout(() => {
        switchView(VIEWS.offline, offlineLoginViewOnSuccess, 500, 500, async () => {
            // Temporary workaround
            if(offlineLoginViewOnSuccess === VIEWS.settings){
                await prepareSettings()
            }
            offlineLoginViewOnSuccess = VIEWS.landing // Reset this for good measure.
            offlineLoginCancelEnabled(false) // Reset this for good measure.
            offlineLoginViewCancelHandler = null // Reset this for good measure.
            offlineLoginUsername.value = ''
            $('.circle-loader').toggleClass('load-complete')
            $('.offlineCheckmark').toggle()
            offlineLoginLoading(false)
            loginButton.innerHTML = loginButton.innerHTML.replace(Lang.queryJS('login.success'), Lang.queryJS('login.login'))
            offlineFormDisabled(false)
        })
    }, 1000)
})