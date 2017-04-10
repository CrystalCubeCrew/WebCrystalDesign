let Nav = new Augject({
  el: 'c-nav',
  opts: {
    template: {
      id: '#nav-template',
      src: 'NavComponent'
    },
    data: {
      logo: "https://imghost.io/images/2017/03/27/crystalcube.md.png"
    }
  }
})

let HeaderOpts = {
  el: 'c-header',
  opts: {
    template: {
      id: '#header-template',
      src: 'HeaderComponent'
    },
    data: {
      title: "CrystalCube",
      subtitle: "Holographic Virtual Assistant"
    }
  }
}

let Header = new Augject(HeaderOpts)

let FeaturesOpts = {
  el: 'c-content',
  opts: {
    template: {
      id: '#features-template',
      src: 'FeaturesComponent'
    },
    data: {
      ft1_title: "Speech Recognition",
      ft1_description: "Natural language processing powered by API.AI",
      ft1_img: "img/ft1.png",

      ft2_title: "Interactive Avatar",
      ft2_description: "Crystal-chan is an energetic chatbot, designed in Blender and displayed through Unity3D",
      ft2_img: "img/ft2.png",

      ft3_title: "User Personalization",
      ft3_description: "Sync user data across the cloud, powered by Amazon Web Services",
      ft3_img: "img/ft3.png",

      more: "...and more including Facial Recognition, Holographic Display and Gesture Recognition!"
    }
  }
}

let Features = new Augject(FeaturesOpts)

let Footer = new Augject({
  el: 'c-footer',
  opts: {
    template: {
      id: '#footer-template',
      src: 'FooterComponent'
    },
    data: {
      footer: "CrystalCube &bull; 2017<br><a href='#!/tos' onclick='setRoute()'>Terms of Service</a> <a href='#!/app' onclick='setRoute()'>App</a>"
    }
  }
})


let AboutFragment = {
  el: 'c-content',
  opts: {
    template: {
      id: '#about-template',
      src: 'AboutFragment'
    }
  }
}

let TeamFragment = {
  el: 'c-content',
  opts: {
    template: {
      id: '#team-template',
      src: 'TeamFragment'
    }
  }
}

let LoginFragment = {
  el: 'c-content',
  opts: {
    template: {
      id: '#login-template',
      src: 'LoginFragment'
    }
  }
}

let App = {
  el: 'c-content',
  opts: {
    template: {
      id: '#app-template',
      src: 'AppFragment'
    }
  }
}

let TOS = {
  el: 'c-content',
  opts: {
    template: {
      id: '#tos-template',
      src: 'TOSFragment'
    }
  }
}

// Ghetto AugRouter
setRoute()
function setRoute() {
  setTimeout(() => {
    // console.log(`Setting route of ${window.location.hash}...`)
    if (window.location.hash) {
      switch (window.location.hash) {
        case '#!/about':
          Header.setOpts(HeaderOpts)
          Features.setOpts(AboutFragment)
          document.getElementById('firebaseui-auth-container').style.display = "none"
          break
        case '#!/team':
          Header.setOpts(HeaderOpts)
          Features.setOpts(TeamFragment)
          document.getElementById('firebaseui-auth-container').style.display = "none"
          break
        case '#!/login':
          Header.setOpts(HeaderOpts)
          Features.setOpts(LoginFragment)
          document.getElementById('firebaseui-auth-container').style.display = "block"
          break
        case '#!/login?mode=select':
          Header.setOpts(HeaderOpts)
          Features.setOpts(LoginFragment)
          document.getElementById('firebaseui-auth-container').style.display = "block"
          break
        case '#!/login?mode=select=select':
          Header.setOpts(HeaderOpts)
          Features.setOpts(LoginFragment)
          document.getElementById('firebaseui-auth-container').style.display = "block"
          break
        case '#!/app':
          Header.setOpts(LoginFragment)
          Features.setOpts(App)
          document.getElementById('firebaseui-auth-container').style.display = "none"
          break
        case '#!/tos':
          Header.setOpts(LoginFragment)
          Features.setOpts(TOS)
          document.getElementById('firebaseui-auth-container').style.display = "none"
          break
        default:
          Header.setOpts(HeaderOpts)
          Features.setOpts(FeaturesOpts)
          document.getElementById('firebaseui-auth-container').style.display = "none"
          break;
      }
    }
  }, 0)
}
