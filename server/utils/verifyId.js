const UserModel = require('../models/User');
const DentistModel = require('../models/Dentist');
const AppointmentModel = require('../models/Appointment');

async function verifyId(entityType, id) {
    try {
        let entity;
        switch (entityType) {
            case 'User':
                entity = await UserModel.getUserById(id);
                break;
            case 'Dentist':
                entity = await DentistModel.getDentistById(id);
                break;
            case 'Appointment':
                entity = await AppointmentModel.getAppointmentById(id);
                break;
            default:
                return { status: 422 , error: 'Invalid entity type' }
        }

        if (!entity) {
            return { status: 404 , error: `${entityType} not found` }
        }

        return entity;
    } catch (error) {
        return { error: `Error verifying ${entityType} ID: ${error.message}` };
    }
}

module.exports = verifyId;
