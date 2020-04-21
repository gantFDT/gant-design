let componentsMaps={
}
let frameworkComponentsMaps={

}

export function setComponentsMaps(components){
	componentsMaps= {
		...componentsMaps,
		...components
	}
	return componentsMaps
}
export function setFrameworkComponentsMaps(components){
	frameworkComponentsMaps= {
		...frameworkComponentsMaps,
		...components
	}
	return frameworkComponentsMaps
}
export function getAllComponentsMaps() {
	return {componentsMaps,frameworkComponentsMaps}
} 