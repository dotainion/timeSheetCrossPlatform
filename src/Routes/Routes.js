class Routes{
    //users
    default = '/';
    clockIn = '/clock/in';
    signIn = '/sign/in';
    register = '/register';
    recovery = '/recovery';
    profile = '/profile';
    registration = '/registration';
    //
    _nested = '';

    admin = () => '/admin/*';
    administrator = () => this._nested + 'administrator/*'
    teams = () => this._nested + 'teams/*';
    teamsList = () => this._nested + 'list';
    teamMembers = () => this._nested + 'team/members:teamId';
    dashboard = () => this._nested + 'dashboard';
    report = () => this._nested + 'report:memberId:sheetId/*';
    spreadsheetReport = () => this._nested + 'spread/sheet/report:memberId:spreadsheetId/*';
    members = () => this._nested + 'all/members';
    createMember = () => this._nested + 'create/member:teamId';
    memberSettings = () => this._nested + 'member/settings:userId';
    spreadSheetSettings = () => this._nested + 'spread/sheet/settings:userId';
    manageTeam = () => this._nested + 'manage/team:teamId';
    invoice = () => this._nested + 'invoice:userId';
    membersSpreadsheets = () => this._nested + 'members/google/sheets';
    manageMembers = () => this._nested + 'manage/members';
    messages = () => this._nested + 'messages:teamId/*';
    userMessage = () => this._nested + 'user:userId';
    supervisorClockin = () => this._nested + 'supervisor/clock/in';
    adminProfile = () => this._nested + 'admin/profile';
    userProfile = () => this._nested + 'user/profile/user:userId';
    adminSettings = () => this._nested + 'admin/settings/user:userId';

    nested(){
        this._nested = this.admin().replace('*', '');
        return this;
    }

    nestedMsg(){
        this._nested = this.teams().replace('*', '');
        return this;
    }

    route(){
        this._nested = '';
        return this;
    }
}

export const routes = new Routes();

