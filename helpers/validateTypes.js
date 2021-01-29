class ValidateTypes {
	static isString(data){
		if (typeof data === 'string'){
			return true
		}
	}
	static isObject(data) {
		if(typeof data === 'object'){
			return true;
		}
	}
	static isNumber(data){
		if(typeof data === 'number'){
			return true;
		}
	}
}

module.exports = ValidateTypes;