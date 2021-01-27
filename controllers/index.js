const Response = require('../helpers/response')


class MyDetails {
	static home (req, res){
		const data = {
			message: "My Rule-Validation API",
			status: "success",
			data: {
			  name: "Oloruntobi Ademola Awoderu",
			  github: "@OloruntobiAwoderu",
			  email: "awoderuoloruntobi@gmail.com",
			  mobile: "08116607518",
			  twitter: "@Oloruntoby_"
			}
		  };
		  return Response.successResponse(res, 200, data)
	}
}

module.exports = MyDetails