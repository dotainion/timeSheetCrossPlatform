export class Roles{
    admin = 'admin';
    employee = 'employee';
    supervisor = 'supervisor';

    roles(){
        return [
            ...this.members(),
            ...this.superiors()
        ];
    }

    members(){
        return [
            {
                title: this.employee,
            }
        ];
    }

    superiors(){
        return [
            {
                title: this.admin,
            },{
                title: this.supervisor,
            }
        ];
    }
    
    includes(role){
        for(let r of this.roles()){
            if (r.title === role) return true;
        };
        return false;
    }

    isMember(role){
        for(let r of this.members()){
            if (r.title === role) return true;
        };
        return false;
    }

    isSuperior(role){
        for(let r of this.superiors()){
            if (r.title === role) return true;
        };
        return false;
    }
}