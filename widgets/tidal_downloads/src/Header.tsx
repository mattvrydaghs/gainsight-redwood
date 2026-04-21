export interface HeaderProps {
    product_name: string;
    version: string;
    release_date: string;
    isLatest: boolean;
}

export const Header: React.FC<HeaderProps> = ({ product_name, version, release_date, isLatest }) => (
  <div className="td-header">
    <div className="td-product-name">{product_name}</div>
      <div className="td-version-row">
        <span className="td-version-label">Version {version}</span>
        {isLatest && <span className="td-latest-chip">LATEST</span>}</div>
      <div className="td-date">Released {release_date}</div>
  </div>
);

export default Header;