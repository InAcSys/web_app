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
import axios from "axios";

interface Props {
  children: ReactNode;
}

type setTextFunction = (value: string) => void;
type setDateFunction = (value: Date) => void;
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
  startDate: Date | undefined;
  endDate: Date | undefined;
  setStartDate: setDateFunction;
  setEndDate: setDateFunction;
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
  birthDate: Date | undefined;
  setBirthDate: setDateFunction;
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
  const API_URL = "http://127.0.0.1:8000/api/";

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

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

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
  const [birthDate, setBirthDate] = useState<Date>();

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
    const response = await axios.get(
      `${API_URL}academics/states?filters[country_id]=1`
    );
    const result = response.data;

    const departmentsList: Array<Department> = result.map((item: any) => ({
      id: item.id,
      name: item.name,
    }));

    setDepartments(departmentsList);
  };

  const getCities = async () => {
    const response = await axios.get(
      `${API_URL}academics/cities?filters[state_id]=${departments[department].id}`
    );
    const result = await response.data;

    const citiesList: Array<City> = result.map((item: any) => ({
      id: item.id,
      name: item.name,
    }));

    setCity(-1);
    setCities(citiesList);
  };

  const getNatures = async () => {
    const response = await axios.get(`${API_URL}academics/natures`);

    const natureResponse = response.data;

    const natureList: Array<Nature> = natureResponse.map((item: any) => ({
      id: item.id,
      name: item.name,
    }));

    setNatures(natureList);
  };

  const getPeriods = async () => {
    const response = await axios.get(`${API_URL}academics/periods`);

    const periodResponse = response.data;

    const periodList: Array<Period> = periodResponse.map((item: any) => ({
      id: item.id,
      name: item.name,
    }));

    setPeriods(periodList);
  };

  const getTypes = async () => {
    const response = await axios.get(`${API_URL}academics/types`);

    const result = await response.data;

    const instituteTypeList: Array<InstituteType> = result.map((item: any) => ({
      id: item.id,
      name: item.name,
    }));

    setInstituteTypes(instituteTypeList);
  };

  const createInstitute = async () => {
    if (!startDate || !endDate) return;

    const startDateAux = `${startDate.getFullYear()}-${String(
      startDate.getMonth() + 1
    ).padStart(2, "0")}-${String(startDate.getDate()).padStart(2, "0")}`;
    const endDateAux = `${endDate.getFullYear()}-${String(
      endDate.getMonth() + 1
    ).padStart(2, "0")}-${String(endDate.getDate()).padStart(2, "0")}`;

    const requestBody = {
      name: name,
      subdomain: subDomain,
      location: location,
      email: `contact@${subDomain}.edu.bo`,
      phone: "+591 65330533",
      established_year: 1900,
      start_date: startDateAux,
      end_date: endDateAux,
      type_id: instituteTypes[institutionType].id,
      nature_id: natures[institutionNature].id,
      period_id: periods[institutionPeriod].id,
      country_id: 1,
      state_id: departments[department].id,
      city_id: cities[city].id,
    };

    const response = await axios.post(
      `${API_URL}academics/institutes`,
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;

    if (data) {
      const idResponse = await axios.get(
        `${API_URL}academics/institutes/by?column=subdomain&value=${data.subdomain}`
      );

      const id = idResponse.data.id;

      if (id) {
        await axios.post(
          `${API_URL}auth/role-permissions/initialize/${id}`,
          {},
          {
            withCredentials: true,
          }
        );
        setTenantId(id);
        navigate("/registration/principal");
      }
    }
  };

  const checkSubDomainAvailability = async () => {
    if (subDomain.length === 0) return;
    const response = await axios.get(
      `${API_URL}academics/institutes/subdomain/${subDomain}`
    );
    const result = response.data;

    if (result) {
      setSubDomainError("Subdominio no disponible");
    } else {
      setSubDomainError("");
    }
  };

  const registerPrincial = async () => {
    if (!birthDate) return;
    const birthDateAux = `${birthDate.getFullYear()}-${String(
      birthDate.getMonth() + 1
    ).padStart(2, "0")}-${String(birthDate.getDate()).padStart(2, "0")}`;
    const requestBody = {
      firstnames: firstNames,
      lastnames: lastNames,
      shortname: shortName,
      ci: ci,
      email: email,
      password: password,
      gender: gender,
      birthdate: birthDateAux,
      role_id: 4,
      tenant_id: tenantId,
    };

    console.log(requestBody);

    const response = await axios.post(`${API_URL}users`, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 201 || response.status === 200) {
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
