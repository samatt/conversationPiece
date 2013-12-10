function ShapeParticle(restPos, dir, mappingIndex)
{
        this.restPos = restPos.clone();
        this.direction = dir.clone();
        this.index = mappingIndex;
        this.displace = 0;
        this.vertices = [];
        shapeMappingData[mappingIndex] = 0;

        this.update = function()
        {
                var force = shapeMappingData[this.index];

                this.displace += Math.pow(force*10, 2);

                for (var i=0; i<this.vertices.length; i++)
                {
                        this.vertices[i].addVectors(this.restPos, this.direction.clone().multiplyScalar(this.displace));
                }
        }

        this.addVertex = function(vert)
        {
                this.vertices.push(vert);
        }

        this.isEquals = function(otherPar)
        {
                return this.restPos.equals(otherPar.restPos);
        }
}