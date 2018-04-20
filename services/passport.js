const passport = require('passport');
const User = require('../model/user');
const config = require('../config');
const JwtStrategy = require('passport-jw').Strategy;
const ExtractJwr = require('passport-jwt').ExtractJwt;