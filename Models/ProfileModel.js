module.exports = (sequelize, DataTypes) => {
  const ALLOWED_LANGUAGES = [
    "Hindi",
    "English",
    "Bengali",
    "French",
    "Odia",
    "Telugu",
    "Kannada",
    "Malayalam",
    "Sanskrit",
    "Assamese",
    "German",
    "Spanish",
    "Marwari",
    "Manipuri",
    "Urdu",
    "Sindhi",
    "Kashmiri",
    "Bodo",
    "Nepali",
    "Konkani",
    "Maithili",
    "Arabic",
    "Bhojpuri",
    "Dutch",
    "Rajasthani",
  ];

  const ALLOWED_SKILLS = [
    "Vedic",
    "Tarot",
    "KP",
    "Numerology",
    "Lal Kitab",
    "Psychic",
    "Palmistry",
    "Cartomancy",
    "Prashana",
    "Loshu Grid",
    "Nadi",
    "Face Reading",
    "Horary",
    "Life Coach",
    "Western",
    "Psychologist",
    "Vastu",
  ];

  const UserProfile = sequelize.define(
    "UserProfile",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM("male", "female", "others"),
        allowNull: false,
      },
      profilePicture: {
        type: DataTypes.STRING,
      },
      bio: {
        type: DataTypes.STRING,
      },
      preferredLanguages: {
        type: DataTypes.JSON,
        allowNull: true,
        validate: {
          isArrayOfAllowedLanguages(value) {
            if (!Array.isArray(value)) {
              throw new Error("Preferred languages must be an array.");
            }
            for (const language of value) {
              if (!ALLOWED_LANGUAGES.includes(language)) {
                throw new Error(
                  `Invalid language: ${language}. Allowed values are: ${ALLOWED_LANGUAGES.join(
                    ", "
                  )}.`
                );
              }
            }
          },
        },
      },
      skills: {
        type: DataTypes.JSON,
        validate: {
          isArrayOfAllowedSkills(value) {
            if (!Array.isArray(value)) {
              throw new Error("Skills must be an array.");
            }
            for (const skill of value) {
              if (!ALLOWED_SKILLS.includes(skill)) {
                throw new Error(
                  `Invalid skill: ${skill}. Allowed values are: ${ALLOWED_SKILLS.join(
                    ", "
                  )}.`
                );
              }
            }
          },
        },
      },
      phoneOs: {
        type: DataTypes.ENUM("android", "iphone"),
      },
      dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      timeOfBirth: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      birthCity: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avail_chat: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      avail_voice: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      avail_video: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      price_chat: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      price_voice: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      price_video: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      wallet_balance: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
    },
    {
      tableName: "user_profiles",
      timestamps: true,
    }
  );

  return UserProfile;
};
