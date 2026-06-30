import {
  useNavigate,
  useLocation,
  useParams as rrUseParams,
  useSearchParams as rrUseSearchParams,
} from "react-router-dom";

export function useRouter() {
  const navigate = useNavigate();

  return {
    push: (href) => navigate(href),
    replace: (href) => navigate(href, { replace: true }),
    back: () => navigate(-1),
    forward: () => navigate(1),
    refresh: () => window.location.reload(),
    prefetch: () => {},
  };
}

export function usePathname() {
  return useLocation().pathname;
}

export function useParams() {
  return rrUseParams();
}

export function useSearchParams() {
  const [searchParams] = rrUseSearchParams();
  return searchParams;
}