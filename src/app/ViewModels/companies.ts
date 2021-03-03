export interface Companies {
    id : number,
    name : string,
    address : string,
    email : string,
    phone : number | null,
    createdAt : string
    

}

export interface Employee {
    id : number,
    name : string,
    email : string,
    phone : number | null,
    designation : string,
    companyID : number | null,
    date : string

}

export interface Skills {
    id : number,
    skill : string,
    rate : number | null,
    employeeID : number | null
}

export interface Education {
    id : number,
    name : string,
    course : string,
    year : string,
    employeeID : number | null
}