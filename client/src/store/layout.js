
export default {
	namespaced: true,
    state: {
        navPos: 'left', //top, bottom, left, right, false
        toolbar: 'top', //top, bottom, false
        footer: true, //above, below, false
        boxed: false, //true, false
        roundedCorners: false, //true, false
        viewAnimation: 'fade-top', // fade-left, fade-right, fade-top, fade-top-in-out, fade-bottom, fade-bottom-in-out, fade, false
	},
    mutations: {
        setLayout(state, payload) {
			if(payload && payload.navPos !== undefined)
				state.navPos = payload.navPos

			if(payload && payload.toolbar !== undefined)
				state.toolbar = payload.toolbar
				
			if(payload && payload.footer !== undefined)
				state.footer = payload.footer
		
			if(payload && payload.boxed !== undefined)
				state.boxed = payload.boxed

			if(payload && payload.roundedCorners !== undefined)
				state.roundedCorners = payload.roundedCorners

			if(payload && payload.viewAnimation !== undefined)
				state.viewAnimation = payload.viewAnimation
		},
    },
    getters: {
        layout(state, getters) {
			return state.layout
		},
		navPos(state, getters) {
			return state.navPos
		},
		toolbar(state, getters) {
			return state.toolbar
		},
		footer(state, getters) {
			return state.footer
		},
		boxed(state, getters) {
			return state.boxed
		},
		roundedCorners(state, getters) {
			return state.roundedCorners
		},
		viewAnimation(state, getters) {
			return state.viewAnimation
		},
    },
}