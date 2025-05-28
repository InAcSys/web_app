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
import { useAuthContext } from "./AuthContext";

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
  startDate: string;
  endDate: string;
  setStartDate: setTextFunction;
  setEndDate: setTextFunction;
  logo: string;
  setLogo: setTextFunction;
  // Principal
  firstNames: string;
  setFirstNames: setTextFunction;
  lastNames: string;
  setLastNames: setTextFunction;
  shortName: string;
  setShortName: setTextFunction;
  ci: string;
  setCI: setTextFunction;
  ciType: string;
  setCIType: setTextFunction;
  imageUrl: string;
  setImageUrl: setTextFunction;
  address: string;
  setAddress: setTextFunction;
  phone: string;
  setPhone: setTextFunction;
  email: string;
  setEmail: setTextFunction;
  password: string;
  setPassword: setTextFunction;
  repeatPassword: string;
  setRepeatPassword: setTextFunction;
  gender: string;
  setGender: setTextFunction;
  birthDate: string;
  setBirthDate: setTextFunction;
  registerPrincial: () => void;
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
  const { logIn } = useAuthContext();

  const navigate = useNavigate();
  const API_URL = "http://localhost:3000/";

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

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Principal
  const [tenantId, setTenantId] = useState<string>("");
  const [firstNames, setFirstNames] = useState("");
  const [lastNames, setLastNames] = useState("");
  const [shortName, setShortName] = useState("");
  const [ci, setCI] = useState("");
  const [ciType, setCIType] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");

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
    const response = await fetch(`${API_URL}departments/1`);
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
    const response = await fetch(`${API_URL}cities/${department + 1}`);
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
      startTime: startDate,
      endTime: endDate,
    };

    const response = await fetch("http://localhost:3000/institute/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      const result = await response.text();
      setTenantId(result);
      if (result !== "") {
        navigate("/registration/principal");
      }
    }
  };

  const checkSubDomainAvailability = async () => {
    if (subDomain.length === 0) return;
    const response = await fetch(
      `http://localhost:3000/verify/sub-domain?subDomain=${subDomain}`,
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
        setSubDomainError("");
      }
    }
  };

  const registerPrincial = async () => {
    const requestBody = {
      firstNames: firstNames,
      lastNames: lastNames,
      shortName: shortName,
      ci: ci,
      ciType: ciType,
      imageUrl: imageUrl,
      address: address,
      phoneNumber: phone,
      email: email,
      password: password,
      gender: gender,
      birthDate: birthDate,
      roleId: 4,
    };

    const response = await fetch(
      `http://localhost:3000/principal/registration?tenantId=${tenantId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (response.ok) {
      logIn(email, password);
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
      startDate,
      endDate,
      setStartDate,
      setEndDate,
      // Principal
      firstNames,
      setFirstNames,
      lastNames,
      setLastNames,
      shortName,
      setShortName,
      ci,
      setCI,
      ciType,
      setCIType,
      imageUrl,
      setImageUrl,
      address,
      setAddress,
      phone,
      setPhone,
      email,
      setEmail,
      password,
      setPassword,
      repeatPassword,
      setRepeatPassword,
      gender,
      setGender,
      birthDate,
      setBirthDate,
      registerPrincial,
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
      startDate,
      endDate,
      firstNames,
      lastNames,
      shortName,
      ci,
      ciType,
      imageUrl,
      address,
      phone,
      email,
      password,
      repeatPassword,
      gender,
      birthDate,
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
