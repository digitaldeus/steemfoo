import steem, { getPosts } from '../steem'
import { pending, resolve, reject } from '../../utilities/reducer'
import { VYBE_GET_POSTS } from '../../types'

jest.mock('axios')

describe('steem tests', () => {
  // const options = { tag: test }
  describe('getPosts', () => {
    it('should throw when called with no post type', () => {
      expect(getPosts()).toThrow()
    })

    it('should throw when called with unknown post type', () => {
      expect(getPosts('fakemethodtype')).toThrow()
    })

    it('should not throw when called with a know post type', () => {
      expect(getPosts('latest')).not.toThrow()
      expect(getPosts('trending')).not.toThrow()
      expect(getPosts('hot')).not.toThrow()
    })
  })

  describe('steem reducer', () => {
    it('should return the initial state', () => {
      expect(steem(undefined, {})).toEqual({
        posts: [],
        isLoadingPosts: false,
      })
    })

    it(`should handle VYBE_GET_POSTS_PENDING`, () => {
      const action = { type: 'VYBE_GET_POSTS_PENDING', payload: {} }

      expect(steem(undefined, action)).toEqual({
        posts: [],
        isLoadingPosts: true,
      })
    })

    it(`should handle VYBE_GET_POSTS_FULFILLED`, () => {
      const data = [1, 2, 3]
      const action = { type: 'VYBE_GET_POSTS_FULFILLED', payload: { data } }

      expect(steem(undefined, action)).toEqual({
        posts: data,
        isLoadingPosts: false,
      })
    })

    it(`should handle VYBE_GET_POSTS_REJECTED`, () => {
      const error = 'error'
      const action = {
        type: 'VYBE_GET_POSTS_REJECTED',
        payload: { error },
      }

      expect(steem(undefined, action)).toEqual({
        error,
        isLoadingPosts: false,
        posts: [],
      })
    })
  })
})
