interface Props {
  title: string;
  subRoute: string;
}

export const SubRouteHeader = ({ title, subRoute }: Props) => {
  return (
    <div className="sub-route-header-container">
      <h1 className="sub-route-header-text">{title}</h1>
      <h2 className="sub-route-header-sub-route-text">{subRoute}</h2>
    </div>
  )
};
