const textureManager = {
    textures: {
      dirt: ["dirt.jpg"],
      firepit: ["fire.jpg", "charcoal.jpg", "stone.jpg"]
      // Adicione mais texturas conforme necessário
    },
    getTexture: function(id) {
      return this.textures[id] || [];
    }
  };
  
  export default textureManager;
  