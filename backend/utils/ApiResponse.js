class ApiResponse{
    constructor(status, message ="Success", data ) {
        this.status = status; // HTTP status code
        this.message = message; // Response message
        this.data = data; // Optional data payload
    }           
}
export default ApiResponse;