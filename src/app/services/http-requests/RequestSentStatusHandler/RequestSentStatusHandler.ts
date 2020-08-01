export abstract class RequestSentStatus {
    isError = false;
    isSuccess = false;
    isLoading = false;

    handleRequestSent(){
        this.isLoading = true;
        this.isSuccess = false;
        this.isError = false;
      }
    
      handleRequestSuccess(){
        this.isError = false;
        this.isSuccess = true;
        this.isLoading = false;
      }
    
      handleRequestError(){
        this.isError = true;
        this.isSuccess = false;
        this.isLoading = false;
      }
}