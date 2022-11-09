export function capitalize(string: string) {
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
}

export function capitalizeEachWord(string: string) {
  return string.trim().split(' ').map(capitalize).join(' ');
}

export function kebabCaseToNormal(string: string) {
  return string.replace(/-/gi, ' ');
}

export default {
  capitalize,
  kebabCaseToNormal,
};
