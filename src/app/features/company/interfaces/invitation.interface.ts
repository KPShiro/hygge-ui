import { OrganizationInvitationStatus } from '@app/common/enum/organization-invitation-status.enum';

export interface IInvitation {
    _id: string;
    issuerId: string;
    organizationId: string;
    email: string;
    status: OrganizationInvitationStatus;
}
