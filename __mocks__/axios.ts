import axios from 'axios';
import { vi } from 'vitest';

const mockedAxios = vi.fn().mockImplementation(() => axios);

export default mockedAxios;
