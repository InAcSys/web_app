import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router";
import {
  City,
  Country,
  Department,
  InstituteType,
  Nature,
  Period,
} from "../models";

interface Props {
  children: ReactNode;
}

type setTextFunction = (value: string) => void;
type setNumberFunction = (value: number) => void;

interface Types {
  name: string;
  setName: setTextFunction;
  subDomain: string;
  setSubDomain: setTextFunction;
  institutionType: number;
  setInstitutionType: setNumberFunction;
  institutionNature: number;
  setInstitutionNature: setNumberFunction;
  institutionPeriod: number;
  setInstitutionPeriod: setNumberFunction;
  country: number;
  setCountry: setNumberFunction;
  department: number;
  setDepartment: setNumberFunction;
  city: number;
  setCity: setNumberFunction;
  location: string;
  setLocation: setTextFunction;
  startDay: number;
  startMonth: number;
  startYear: number;
  startDate: string;
  endDay: number;
  endMonth: number;
  endYear: number;
  endDate: string;
  setStartDay: setNumberFunction;
  setStartMonth: setNumberFunction;
  setStartYear: setNumberFunction;
  setEndDay: setNumberFunction;
  setEndMonth: setNumberFunction;
  setEndYear: setNumberFunction;
  logo: string;
  setLogo: setTextFunction;
  // Principal
  firstNames: string;
  setFirstNames: setTextFunction;
  lastNames: string;
  setLastNames: setTextFunction;
  shortName: string;
  setShortName: setTextFunction;
  email: string;
  setEmail: setTextFunction;
  password: string;
  setPassword: setTextFunction;
  // Form data
  countries: Array<Country>;
  phoneCode: string;
  departments: Array<Department>;
  cities: Array<City>;
  natures: Array<Nature>;
  periods: Array<Period>;
  instituteTypes: Array<InstituteType>;
  createInstitute: () => void;

  // Errors
  subDomainError: string;
}

const RegistrationContext = createContext<Types | undefined>(undefined);

export const RegistrationProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const currentDate = new Date();

  const [name, setName] = useState("");
  const [institutionType, setInstitutionType] = useState(-1);
  const [institutionNature, setInstitutionNature] = useState(-1);
  const [institutionPeriod, setInstitutionPeriod] = useState(-1);
  const [country, setCountry] = useState(1);
  const [department, setDepartment] = useState(-1);
  const [city, setCity] = useState(-1);
  const [subDomain, setSubDomain] = useState("");
  const [location, setLocation] = useState("");
  const [logo, setLogo] = useState("");
  const [startDay, setStartDay] = useState(currentDate.getDate());
  const [startMonth, setStartMonth] = useState(currentDate.getMonth());
  const [startYear, setStartYear] = useState(currentDate.getFullYear());
  const [endDay, setEndDay] = useState(currentDate.getDate());
  const [endMonth, setEndMonth] = useState(currentDate.getMonth());
  const [endYear, setEndYear] = useState(currentDate.getFullYear());

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Principal
  const [tenantId, setTenantId] = useState<string>("");
  const [firstNames, setFirstNames] = useState("");
  const [lastNames, setLastNames] = useState("");
  const [shortName, setShortName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Form data
  const [countries, setCountries] = useState([]);
  const [departments, setDepartments] = useState<Array<Department>>([]);
  const [cities, setCities] = useState<Array<City>>([]);
  const [natures, setNatures] = useState<Array<Nature>>([]);
  const [periods, setPeriods] = useState<Array<Period>>([]);
  const [instituteTypes, setInstituteTypes] = useState<Array<InstituteType>>(
    []
  );
  const [phoneCode, setPhoneCode] = useState("+591");

  // Errors
  const [subDomainError, setSubDomainError] = useState("");

  const getDepartments = async () => {
    const response = await fetch(
      "http://localhost:5000/api/Department/parent-id/1"
    );
    const result = await response.text();
    const departmentsResponse = JSON.parse(result);

    const departmentsList: Array<Department> = departmentsResponse.map(
      (item: any) => ({
        id: item.id,
        name: item.name,
      })
    );

    setDepartments(departmentsList);
  };

  const getCities = async () => {
    const response = await fetch(
      `http://localhost:5000/api/City/parent-id/${department + 1}`
    );
    const result = await response.text();
    const citiesResponse = JSON.parse(result);

    const citiesList: Array<City> = citiesResponse.map((item: any) => ({
      id: item.id,
      name: item.name,
    }));

    setCity(-1);
    setCities(citiesList);
  };

  const getNatures = async () => {
    const response = await fetch(
      "http://localhost:5000/api/Nature?pageNumber=1&pageSize=100"
    );

    const result = await response.text();
    const natureResponse = JSON.parse(result);

    const natureList: Array<Nature> = natureResponse.map((item: any) => ({
      id: item.id,
      name: item.name,
    }));

    setNatures(natureList);
  };

  const getPeriods = async () => {
    const response = await fetch(
      "http://localhost:5000/api/Period?pageNumber=1&pageSize=100"
    );

    const result = await response.text();
    const periodResponse = JSON.parse(result);

    const periodList: Array<Period> = periodResponse.map((item: any) => ({
      id: item.id,
      name: item.name,
    }));

    setPeriods(periodList);
  };

  const getTypes = async () => {
    const response = await fetch(
      "http://localhost:5000/api/Type?pageNumber=1&pageSize=100"
    );

    const result = await response.text();
    const instituteTypeResponse = JSON.parse(result);

    const instituteTypeList: Array<InstituteType> = instituteTypeResponse.map(
      (item: any) => ({
        id: item.id,
        name: item.name,
      })
    );

    setInstituteTypes(instituteTypeList);
  };

  const createInstitute = async () => {
    const requestBody = {
      name: name,
      type: institutionType + 1,
      nature: institutionNature + 1,
      period: institutionPeriod + 1,
      subDomain: subDomain,
      country: 1,
      departament: departments[department].id,
      city: cities[city].id,
      location: location,
      startTime: `${startYear}-${startMonth < 10 ? "0" + startMonth : startMonth}-${startDay < 10 ? "0" + startDay : startDay}`,
      endTime: `${endYear}-${endMonth < 10 ? "0" + endMonth : endMonth}-${endDay < 10 ? "0" + endDay : endDay}`,
    };

    console.log(requestBody)

    const response = await fetch("http://localhost:5000/api/Institute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      const result = await response.text();
      const entity = JSON.parse(result);
      setTenantId(entity.id);
      console.log(entity.id);
      if (entity.id !== "") {
        navigate("/registration/principal");
      }
    }
  };

  const checkSubDomainAvailability = async () => {
    if (subDomain.length === 0) return
    const response = await fetch(
      `http://localhost:5000/api/Institute/verify-subdomain?subDomain=${subDomain}`,
      {
        method: "POST",
      }
    );

    if (response.ok) {
      const result = await response.text();
      const subDomainResult = JSON.parse(result);
      if (subDomainResult) {
        setSubDomainError("Subdominio no disponible");
      } else {
        setSubDomainError("")
      }
    }
  };

  useEffect(() => {
    getDepartments();
    getPeriods();
    getNatures();
    getTypes();
  }, []);

  useEffect(() => {
    getCities();
  }, [department]);

  useEffect(() => {
    setStartDate(`${startDay}/${startMonth}/${startYear}`);
  }, [startDay, startMonth, startYear]);

  useEffect(() => {
    setEndDate(`${endDay}/${endMonth}/${endYear}`);
  }, [endDay, endMonth, endYear]);

  useEffect(() => {
    checkSubDomainAvailability();
  }, [subDomain]);

  const result = useMemo(
    () => ({
      name,
      setName,
      subDomain,
      setSubDomain,
      institutionType,
      setInstitutionType,
      institutionNature,
      setInstitutionNature,
      institutionPeriod,
      setInstitutionPeriod,
      country,
      setCountry,
      department,
      setDepartment,
      city,
      setCity,
      location,
      setLocation,
      logo,
      setLogo,
      startDay,
      startMonth,
      startYear,
      endDay,
      endMonth,
      endYear,
      setStartDay,
      setStartMonth,
      setStartYear,
      setEndDay,
      setEndMonth,
      setEndYear,
      startDate,
      endDate,
      // Principal
      firstNames,
      setFirstNames,
      lastNames,
      setLastNames,
      email,
      setEmail,
      password,
      setPassword,
      shortName,
      setShortName,
      // Form data
      countries,
      phoneCode,
      departments,
      cities,
      natures,
      periods,
      instituteTypes,

      createInstitute,

      // Errors
      subDomainError,
    }),
    [
      name,
      subDomain,
      institutionType,
      institutionNature,
      institutionPeriod,
      country,
      department,
      city,
      location,
      logo,
      startDay,
      startMonth,
      startYear,
      endDay,
      endMonth,
      endYear,
      firstNames,
      lastNames,
      email,
      password,
      shortName,
      countries,
      phoneCode,
      departments,
      cities,
      natures,
      periods,
      instituteTypes,
      subDomainError,
    ]
  );

  return (
    <RegistrationContext.Provider value={result}>
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistrationContext = () => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error(
      "useRegistrationContext must be used within an RegistrationProvider"
    );
  }
  return context;
};
