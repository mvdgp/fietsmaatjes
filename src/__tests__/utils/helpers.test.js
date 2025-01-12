import { linkResolver, dateResolver, extractURLfromEmbedMap } from '@/utils/helpers';

describe('linkResolver', () => {
  test('resolves URL with http prefix if missing', async () => {
    const linkObject = { link_type: 'Web', url: 'example.com' };
    const resolvedLink = await linkResolver(linkObject);
    expect(resolvedLink.url).toBe('http://example.com');
  });

  test('does not modify URL with http prefix', async () => {
    const linkObject = { link_type: 'Web', url: 'http://example.com' };
    const resolvedLink = await linkResolver(linkObject);
    expect(resolvedLink.url).toBe('http://example.com');
  });

  test('does not modify URL with https prefix', async () => {
    const linkObject = { link_type: 'Web', url: 'https://example.com' };
    const resolvedLink = await linkResolver(linkObject);
    expect(resolvedLink.url).toBe('https://example.com');
  });

  test('does not modify non-Web link types', async () => {
    const linkObject = { link_type: 'Document', url: 'example.com' };
    const resolvedLink = await linkResolver(linkObject);
    expect(resolvedLink.url).toBe('example.com');
  });
});

describe('dateResolver', () => {
  test('resolves date string to day, month, and year', () => {
    const date = '2023-01-15';
    const resolvedDate = dateResolver(date);
    expect(resolvedDate).toEqual({ day: '15', month: 'JANUARI', year: '2023' });
  });

  test('handles different months correctly', () => {
    const date = '2023-12-25';
    const resolvedDate = dateResolver(date);
    expect(resolvedDate).toEqual({ day: '25', month: 'DECEMBER', year: '2023' });
  });
});

describe('extractURLfromEmbedMap', () => {
  test('extracts URL from embed map raw text', () => {
    const rawText = '<iframe src="https://example.com/map" width="600" height="450"></iframe>';
    const url = extractURLfromEmbedMap(rawText);
    expect(url).toBe('https://example.com/map');
  });

  test('returns null if no URL is found', () => {
    const rawText = '<iframe width="600" height="450"></iframe>';
    const url = extractURLfromEmbedMap(rawText);
    expect(url).toBeNull();
  });

  test('returns null for invalid rawText input', () => {
    const url = extractURLfromEmbedMap(null);
    expect(url).toBeNull();
  });
});