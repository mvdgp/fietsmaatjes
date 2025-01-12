import { buildMenu, buildSocial } from '../../utils/menu-builder';
import { fetchMainPageContent, fetchSubPageContent, fetchSocialContent } from '../../utils/prismic-fetcher';

jest.mock('../../utils/prismic-fetcher', () => ({
  fetchMainPageContent: jest.fn(),
  fetchSubPageContent: jest.fn(),
  fetchSocialContent: jest.fn(),
}));

const mockMainPages = [
  {
    id: '1',
    uid: 'main-1',
    url: '/main-1',
    data: {
      title: [{ type: 'heading1', text: 'Main Page 1' }],
    },
  },
  {
    id: '2',
    uid: 'main-2',
    url: '/main-2',
    data: {
      title: [{ type: 'heading1', text: 'Main Page 2' }],
    },
  },
];

const mockSubPages = [
  {
    id: '1-1',
    uid: 'sub-1-1',
    url: '/sub-1-1',
    data: {
      title: [{ type: 'heading1', text: 'Sub Page 1-1' }],
    },
  },
  {
    id: '1-2',
    uid: 'sub-1-2',
    url: '/sub-1-2',
    data: {
      title: [{ type: 'heading1', text: 'Sub Page 1-2' }],
    },
  },
];

describe('buildMenu', () => {
  beforeEach(() => {
    fetchMainPageContent.mockClear();
    fetchSubPageContent.mockClear();
    console.error = jest.fn(); // Mock console.error to avoid actual error logging during tests
  });

  test('builds the menu structure correctly', async () => {
    fetchMainPageContent.mockResolvedValue(mockMainPages);
    fetchSubPageContent.mockResolvedValue(mockSubPages);

    const menu = await buildMenu();

    expect(menu).toEqual([
      {
        id: '1',
        uid: 'main-1',
        url: '/main-1',
        label: 'Main Page 1',
        submenu: [
          {
            id: '1-1',
            uid: 'sub-1-1',
            url: '/main-1/sub-1-1',
            label: 'Sub Page 1-1',
          },
          {
            id: '1-2',
            uid: 'sub-1-2',
            url: '/main-1/sub-1-2',
            label: 'Sub Page 1-2',
          },
        ],
      },
      {
        id: '2',
        uid: 'main-2',
        url: '/main-2',
        label: 'Main Page 2',
        submenu: [
          {
            id: '1-1',
            uid: 'sub-1-1',
            url: '/main-2/sub-1-1',
            label: 'Sub Page 1-1',
          },
          {
            id: '1-2',
            uid: 'sub-1-2',
            url: '/main-2/sub-1-2',
            label: 'Sub Page 1-2',
          },
        ],
      },
    ]);
  });

  test('handles errors gracefully', async () => {
    fetchMainPageContent.mockRejectedValue(new Error('Error fetching main pages'));
    fetchSubPageContent.mockResolvedValue([]);

    const menu = await buildMenu();

    expect(menu).toEqual([]);
    expect(console.error).toHaveBeenCalledWith('Error fetching menu content:', expect.any(Error));
  });
});

describe('buildSocial', () => {
  beforeEach(() => {
    fetchSocialContent.mockClear();
    console.error = jest.fn(); // Mock console.error to avoid actual error logging during tests
  });

  test('fetches and returns social content', async () => {
    const mockSocials = [
      {
        id: 'social-1',
        uid: 'social-1',
        url: 'https://example.com/social-1',
        data: {
          title: [{ type: 'heading1', text: 'Social 1' }],
        },
      },
    ];
    fetchSocialContent.mockResolvedValue(mockSocials);

    const socials = await buildSocial();

    expect(socials).toEqual(mockSocials);
  });

  test('handles errors correctly', async () => {
    fetchSocialContent.mockRejectedValue(new Error('Error fetching social content'));

    const socials = await buildSocial();

    expect(socials).toEqual([]);
    expect(console.error).toHaveBeenCalledWith('Error fetching social content:', expect.any(Error));
  });
});