const InvalidAccessException = use('App/Exceptions/InvalidAccessException');
const ResourceNotFoundException = use('App/Exceptions/ResourceNotExistException');


class PermissionsService {
    verifyPermission(resource, user){
        if(!resource){
            throw new ResourceNotFoundException()
        }
        if(resource.user_id != user.id){
            throw new InvalidAccessException()
        }
    }
}

module.exports = PermissionsService;