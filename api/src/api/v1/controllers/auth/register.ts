// fastify types import
import { FastifyRequest, FastifyReply } from "fastify";

function validateUsername(username: string): boolean {
	// Define criteria for password validation
	const minLength = 3;
	const maxLength = 10;
	const hasNoSpaces = !/\s/.test(username); // Check for spaces

	// Check if password meets all criteria
	const isValidLength = username.length >= minLength && username.length <= maxLength;

	return isValidLength;
}


function validatePassword(password: string): boolean {
	// Define criteria for password validation
	const minLength = 8;
	const maxLength = 20;
	const hasUpperCase = /[A-Z]/.test(password);
	const hasLowerCase = /[a-z]/.test(password);
	const hasDigit = /\d/.test(password);
	const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
	const hasNoSpaces = !/\s/.test(password); // Check for spaces

	// Check if password meets all criteria
	const isValidLength = password.length >= minLength && password.length <= maxLength;
	const isValidFormat = hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar && hasNoSpaces;

	return isValidLength && isValidFormat;
}
// heath handler function
async function registerHandler(
  request: FastifyRequest<{
    Body: {
      username: string;
      password: string;
    };
  }>,
  reply: FastifyReply,
) {
  try {

		const {username, password} = await request.body;

		//validate username against checks
		if (!validateUsername(username)){
			return reply.status(500).send({
				message: reply.errorTypes.auth[1209],
				success: false,
				data: {},
				error_code: 1209,
			});
		}

		//validate password against checks
		if (!validatePassword(password)){
			return reply.status(500).send({
				message: reply.errorTypes.auth[1210],
				success: false,
				data: {},
				error_code: 1210,
			});
		}

		//checks if their is already a user with the same username
    const existingUser = await request.prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (existingUser) {
			return reply.status(500).send({
				message: reply.errorTypes.auth[1211],
				success: false,
				data: {},
				error_code: 1211,
			});
    }

		//creates the user
		await request.prisma.user.create({
			data: {
				username: username,
				password: password
			}
		})


    return reply.status(200).send({ message: "ok", success: true, data: {username, password} });
  } catch (error: any) {
    request.log.error(error);
    return reply.status(500).send({
      message: reply.errorTypes.main[1000],
      success: false,
      data: {},
      error_code: 1000,
    });
  }
}

export default registerHandler;
