
export default {
    state: {
        navPos: 'left', //top, bottom, left, right, false
        toolbar: 'top', //top, bottom, false
        footer: true, //above, below, false
        boxed: false, //true, false
        roundedCorners: false, //true, false
        viewAnimation: 'fade-top' // fade-left, fade-right, fade-top, fade-top-in-out, fade-bottom, fade-bottom-in-out, fade, false
    },
    mutations: {
        setLayout(state, payload) {
			if(payload && payload.navPos !== undefined)
				state.layout.navPos = payload.navPos

			if(payload && payload.toolbar !== undefined)
				state.layout.toolbar = payload.toolbar
				
			if(payload && payload.footer !== undefined)
				state.layout.footer = payload.footer
		
			if(payload && payload.boxed !== undefined)
				state.layout.boxed = payload.boxed

			if(payload && payload.roundedCorners !== undefined)
				state.layout.roundedCorners = payload.roundedCorners

			if(payload && payload.viewAnimation !== undefined)
				state.layout.viewAnimation = payload.viewAnimation
		},
    },
    getters: {
        layout(state, getters) {
			return state.layout
		},
		navPos(state, getters) {
			return state.layout.navPos
		},
		toolbar(state, getters) {
			return state.layout.toolbar
		},
		footer(state, getters) {
			return state.layout.footer
		},
		boxed(state, getters) {
			return state.layout.boxed
		},
		roundedCorners(state, getters) {
			return state.layout.roundedCorners
		},
		viewAnimation(state, getters) {
			return state.layout.viewAnimation
		},
    },
}