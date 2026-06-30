import { Link as RouterLink } from "react-router-dom";

export default function Link({
  href,
  prefetch,
  scroll,
  passHref,
  legacyBehavior,
  shallow,
  ...rest
}) {
  return <RouterLink to={href} {...rest} />;
}