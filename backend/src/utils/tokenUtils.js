exports.decodeToken=(token)=> {
    if (!token.startsWith('tok_')) throw new Error('Invalid token format');
  
    const base64 = token.slice(4); // remove 'tok_'
    const decoded = Buffer.from(base64, 'base64').toString('utf-8');
    const [projectId, userId] = decoded.split('::');
  
    return { projectId, userId };
  }
  